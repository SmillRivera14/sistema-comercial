using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sistema_comercial.Migrations
{
    /// <inheritdoc />
    public partial class AgregarDeleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Usuarios__RolID__4222D4EF",
                table: "Usuarios");

            migrationBuilder.AddForeignKey(
                name: "FK__Usuarios__RolID__4222D4EF",
                table: "Usuarios",
                column: "RolID",
                principalTable: "Roles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Usuarios__RolID__4222D4EF",
                table: "Usuarios");

            migrationBuilder.AddForeignKey(
                name: "FK__Usuarios__RolID__4222D4EF",
                table: "Usuarios",
                column: "RolID",
                principalTable: "Roles",
                principalColumn: "ID");
        }
    }
}
